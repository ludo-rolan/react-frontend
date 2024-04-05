import React from "react"

const Sidebar = () => {
    return <>
        <aside 
            style={
                {
                    width: '20%',
                    height: '98vh',
                    backgroundColor: '#024c78',
                    borderRight: 'solid white 2px',
                    overflowX: 'scroll',
                }
            }
        >
            Sidebar
        </aside>
    </>
}


export default Sidebar;