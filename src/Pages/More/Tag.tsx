import React from "react";




export default function Tag(props: { tagName: string}) {
    const padding ={
        paddingTop:"1px",
        paddingBottom:"1px"
    }
  return <div style={padding} className="flex items-center justify-center px-2 text-xs font-bold text-center rounded-full min-w-min side-div">{props.tagName}</div>;
}
