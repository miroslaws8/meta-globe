"use client"

import {ModalProps} from "@/providers/ModalProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract} from "wagmi"
import {useWeb3Modal} from "@web3modal/base/utils/library/react";
import {Button} from "@/components/ui/button";
import {ERC_721_ABI} from "@/abi/erc721_abi";
import {Address, ContractFunctionExecutionError, Hex, hexToNumber} from "viem";
import {toast, useToast} from "@/hooks/use-toast";
import {simulateContract} from "@wagmi/core";
import {config} from "@/config/wagmi.config";
import {Input} from "@/components/ui/input";
import {useState} from "react";

const MintPolygonDialog = ({show, openModal, closeModal, ...props}: ModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isMinted, setIsMinted] = useState(false);

  const handleOpenChange = () => {
    show ? closeModal() : openModal(MintPolygonDialog, props);
  }

  // @ts-ignore
  const {properties: {NAME: country, ISO_A2}} = props;

  const { address } = useAccount();
  const { open, close } = useWeb3Modal();
  const {data: hash, isPending, writeContract} = useWriteContract();

  // @ts-ignore
  const {data: fee}: {data: BigInt} = useReadContract({
    abi: ERC_721_ABI,
    address: process.env.NEXT_CONTRACT_ADDRESS as Address,
    functionName: 'fee',
  });

  const handleMint = async () => {
    const payload: any = {
      abi: ERC_721_ABI,
      address: process.env.NEXT_CONTRACT_ADDRESS,
      functionName: 'mint',
      // @ts-ignore
      value: fee * BigInt(5),
      args: [
        quantity,
        'US'
      ]
    };

    simulateContract(config, payload).then(() => {
      writeContract(payload);
    }).catch((error: ContractFunctionExecutionError) => {
      toast({
        title: 'Error',
        description: error.shortMessage,
      })
    });
  }

  const { data, isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  if (!isMinted && data && address && hash) {
    setIsMinted(true);

    data.logs.map((log) => {
      fetch('/api/store-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address,
          hash: hash,
          token_id: hexToNumber(log.topics[3] as Hex),
          country: ISO_A2
        }),
      }).then(res => {
        toast({
          title: 'Success',
          description: 'Token minted successfully',
        })
      });
    })
  }

  return (
    <Dialog modal={show} open={show} defaultOpen={false} onOpenChange={handleOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="break-all">
        <DialogHeader>
          <DialogTitle>Do you want to mint {country}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <div className="flex gap-2">
            <Input type="number" placeholder="Quantity" value={quantity} onInput={(e) => setQuantity(+e.currentTarget.value)} />

            { address === undefined
              ? <Button onClick={() => open()}>Connect wallet</Button>
              : <Button onClick={handleMint} disabled={isPending}>
                {isPending ? 'Confirming...' : 'Mint'}
              </Button>
            }
          </div>

          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MintPolygonDialog;