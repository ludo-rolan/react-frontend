import React,
{
    Suspense,
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    useSyncExternalStore
} from "react";
import BigCalendar from "../components/BigCalendar";
import Sidebar from "../components/Sidebar";
import { Event } from "react-big-calendar";
import {
    fetchTables,
    fetchDataFromTable
} from "../data/AzureDataTable";
import {
    deleteContainer,
    getBlob,
    listBlobs,
    listContainers
} from "../data/AzureContainer";
import AuthContext from "../context/AuthContext";


const events: Event[] = [
    {
        title: 'Meeting',
        start: new Date(2024, 2, 21, 10, 0),
        end: new Date(2024, 2, 21, 12, 0),
        allDay: false
    },
]

const Dashboard = ({ navigate }: any) => {

    const [blob, setBlob] = useState<any>();

    useEffect(() => {
        // deleteContainer()
        // .then(response => console.log(response))
        // .catch(error => console.log("Error: ", error));

        listContainers()
            .then(containers =>
                console.log("Containers:", containers)
            )
            .catch(error => {
                console.error("Error fetching tables:", error);
            });

        listBlobs()
            .then(blobs =>
                console.log("Blobs:", blobs)
            )
            .catch(error => {
                console.error("Error fetching tables:", error);
            });

        getBlob("202432214922.jpg")
            .then(blob =>
                setBlob(blob)
            )
            .catch(error => {
                console.error("Error fetching tables:", error);
            });

        fetchTables()
            .then(tables => {
                console.log("Tables:", tables);
            })
            .catch(error => {
                console.error("Error fetching tables:", error);
            })

        fetchDataFromTable()
            .then(entities => {
                console.log("Entities:", entities);
            })
            .catch(error => {
                console.error("Error fetching data from table:", error);
            });
    }, []);

    const { user } = useContext(AuthContext);

    console.log(user)

    return (user ?
        (
            <>
                <div>
                    <p>You are logged as {user.username}!</p>
                </div>
                <div
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'black',
                            backgroundColor: 'white',
                            height: 'auto',
                            overflow: 'scroll'
                        }
                    }
                >
                    <div>
                        <BigCalendar events={events} />
                        <img src={blob} alt="oups!" className="rounded-[15%] w-14 h-14" />
                        <a onClick={() => { navigate('/login') }}></a>
                    </div>
                </div></>
        ) : (
            <div>
                <p>You are not logged in, redirecting...</p>
            </div>
        )
    )
}

export default Dashboard