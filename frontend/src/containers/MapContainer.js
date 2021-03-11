import React, {useState, useEffect, useCallback} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import MarkerForm from "../components/MarkerForm";
import MarkerDetail from "../components/MarkerDetail";
import Request from "../helpers/request";

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
}
const center = {
    lat: 56.604734,
    lng: -4.265666
}
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

const MapContainer = () => {

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = () => {

        const request = new Request();
        request.get('/api/pins')
        .then((data) => {
            setPins(data);
        })
    }

    const getPinByID = (id) => {
        return pins.find((pin) => {
            return pin.id === parseInt(id);
        });
    }


    const handleDelete = (id) =>  {
        const request = new Request();
          const url = "/api/pins/" + id
          request.delete(url)
            .then(() => window.location = "/pins")
    }
    
    const handlePost = (pin) => {
        const request = new Request();
        request.post("/api/pins", pin)
           .then(() => window.location = '/pins')
      }
    
    const handleUpdate = (pin) => {
        const request = new Request();
        request.patch('/api/pins/' + pin.id, pin).then(() => {
            window.location = '/pins/'
        })
    }


    // const setMarkerIcon = (pin) => {
    //     if pin.category
    // }


    // MAP STUFF
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const [pins, setPins] = useState([]);
    const [selected, setSelected] = useState(null);

    const onMapClick = useCallback((event) => {
        setPins(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        }]);

    }, [])


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <Router>
        <>

        <Switch>
            <Route exact path = "/pins/new" render={() =>
            {return <MarkerForm onCreate={handlePost}/>
            }}/>
        
            <Route exact path="/pins/:id/edit" render={(props) =>{
                const id = props.match.params.id;
                const pin = getPinByID(id);
                return <MarkerForm pin={pin}
                onUpdate={handleUpdate}
                />
            }}/>

            <Route exact path="/pins/:id" render={(props) => {
                const id = props.match.params.id;
                const pin = getPinByID(id);
                return <MarkerDetail pin={pin}
                onDelete={handleDelete}
                onUpdate={handleUpdate} 
                />
            }} />
        </Switch>

        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onClick={onMapClick}
        >
            {pins.map((pin) => {
                return <Marker
                key={pin.id}
                position={{lat: pin.lat, lng: pin.lng}}
                onClick={() => {
                    setSelected(pins[pins.indexOf(pin)]);
                    console.log(pin);
                }}
                icon={{
                    scaledSize: new window.google.maps.Size(25, 25),
                    url: pin.category === "Attraction" ? "https://www.flaticon.com/svg/vstatic/svg/1021/1021360.svg?token=exp=1615491160~hmac=a218a16925aefbf11c1c61eef1cb292a" :
                    (pin.category === "Toilet" ? "https://www.flaticon.com/svg/vstatic/svg/4231/4231239.svg?token=exp=1615491174~hmac=e1705fb72b74f824e1fb4036ef1f83c1": 
                    (pin.category === "Photo Op" ? "https://www.flaticon.com/svg/vstatic/svg/2972/2972198.svg?token=exp=1615491144~hmac=7a7fef2cf2f9a4a941622f50389b47e6" :
                    (pin.category === "Food" ? "https://www.flaticon.com/svg/vstatic/svg/2424/2424721.svg?token=exp=1615491212~hmac=9265287989e8a8f65f1d0718e941e006" :
                    (pin.category === "Parking" ? "https://www.flaticon.com/svg/vstatic/svg/3420/3420317.svg?token=exp=1615491189~hmac=d68299aaf80bf225387edca91b512dfa" : "https://www.flaticon.com/svg/vstatic/svg/595/595735.svg?token=exp=1615491224~hmac=9dff43847b72b8f8095763518d79aadc"))))
                  }}/>
                                
            })}

            {selected ? (
                <InfoWindow
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={() => {
                    setSelected(null)
                }}
                >

                    {/* <MarkerForm pin={selected}
                    onUpdate={handleUpdate}
                    /> */}
                    <MarkerDetail
                        pin={selected}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate} 
                    />
                </InfoWindow>
            ) : null}
        </GoogleMap>

        </>
        </Router>
    )
}

export default MapContainer;