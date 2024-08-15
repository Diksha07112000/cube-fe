import React, { useEffect, useState } from "react";
import axios from "axios";
interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}
interface Props {
  customer: Customer;
}
const CustomerDetails: React.FC<Props> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>(["1","1","1","1","1","1","1","1","1"]);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { count: 9 },
            headers: {
              Authorization: `Client-ID C8HgKTv7yTEBQQPIW4m_4oqKwlSHIo_OxyEQx1NBEjQ`,
            },
          }
        );
        setPhotos(response.data.map((photo: any) => photo.urls.small));
      } catch (error) {
        console.error("Error fetching photos", error);
      }
    };
    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000);
    return () => clearInterval(interval);
  }, [customer]);
  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      <div className="photo-grid">
        {photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Customer's related"
            className="photo-grid-img"
          />
        ))}
      </div>
    </div>
  );
};
export default CustomerDetails;
