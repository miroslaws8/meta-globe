"use client"

import Globe from "react-globe.gl";
import ModalEventBus, {ModalEvent} from "@/events/modalEventBus";
import MintPolygonDialog from "@/components/modals/MintPolygonDialog";
import {darkenRgbString} from "@/lib/utils";
import {MintCountRecord} from "@/database/token";

interface GlobeBlockProps {
  data: any;
  colors: any;
  mintCounts: MintCountRecord[];
}

const GlobeBlock = ({data, colors, mintCounts}: GlobeBlockProps) => {
  return <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    hexPolygonsData={data.features}
    hexPolygonResolution={4}
    hexPolygonMargin={0.1}
    hexPolygonUseDots={false}
    hexPolygonColor={(d) => {
      // @ts-ignore
      const defaultColor = colors[d.properties.ISO_A2] ?? '#f1f1f1';
      // @ts-ignore
      const mintedCount = mintCounts.find((mc) => mc.country === d.properties.ISO_A2)?.mint_count || 0;

      return mintedCount > 0 ? darkenRgbString(defaultColor, mintedCount) : '#f1f1f1';
    }}
    onHexPolygonClick={(hexPolygon) => {
      ModalEventBus.dispatch(ModalEvent.OPEN_MODAL, {
        component: MintPolygonDialog,
        props: {
          // @ts-ignore
          properties: hexPolygon.properties,
        }
      })
    }}
  />
}

export default GlobeBlock;