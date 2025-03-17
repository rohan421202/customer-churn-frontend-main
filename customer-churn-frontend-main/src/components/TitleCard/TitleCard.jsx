import React from 'react'

const TitleCard = ({title, children, topMargin, bottomMargin, TopSideButtons, width, flexDirection, content=true}) => {
  return (
    <div className={"card p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6") + " " + (width) + " " + bottomMargin}>

            <div className={`text-xl font-semibold mt-2`}>{title}</div>
              {
                content && <><div className="divider mt-2"></div>
          
              <div className={'h-full pb-6 bg-base-100 ' + (flexDirection) } >
                  {children}
              </div>
          </>
              }
    </div>
  )
}

export default TitleCard