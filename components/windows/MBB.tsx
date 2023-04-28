import { WINDOWS } from "@/context/WindowsProvider"
import Window, { WindowMenuItem } from "../Window"
import { FC } from "react"
import Link from "next/link"

const MBBWindow: FC = () => {
  const initSize = {
    h: 800,
    w: 1100,
  }
  const initPos = {
    x: 200,
    y: 80
  }

  const link = "https://rarity.monkeybaby.business/"

  const visit = () => { 
    window?.open(link, "_blank")
  }

  const menu: WindowMenuItem[] = [
    {
      label: "Visit Site",
      function: visit
    },
  ]

  return (
    <Window windowKey={WINDOWS.MBB} initSize={initSize} initPosition={initPos} menu={menu} wrapperClassName="bg-amber-50">
      <div className="p-2 h-full">
        <Link className="text-lg font-bold underline" href={link} target="_blank">MBB Marketplace and Rarity Site</Link>
        <br />
        <p>This was a really fun project to work on, lots of interesting and varied challenges. It is also an example of a site I built from the ground up, front and back end.</p>
        <p>I integrated the site with the Solana Blockchain SDK and marketplace APIs so that you can purchase the NFTs directly from this site as well as display the NFTs you own.</p>
        <br />
        <p>I also created an indexing system with webhooks and Firebase for live listing updates. <i>Once a listing is created, deleted, or updated, Helius webhooks relay that information to a serverless function that updates the database which in turn updates the front end UI in real time.</i></p>
      
        <br />
        <p>A few more basic but key features to look for are advanced search and filtering, infinite scrolling, night/day mode and graphs.</p>
        <br />
        <div className="classic-inset h-full">
          <iframe src={link} className="w-full h-full relative" />
          <div className="h-2"/>
        </div>
      </div>
    </Window>
  )
}

export default MBBWindow