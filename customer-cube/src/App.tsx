import React, { useEffect, useState } from "react";

import "./App.css";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import axios from "axios";
import { LoremIpsum } from "lorem-ipsum";
interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}
const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 4, min: 2 },
    wordsPerSentence: { max: 16, min: 8 },
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/", {
          params: {
            results: 100,
          },
        });
        const customerData = response.data.results.map(
          (user: any, index: number) => ({
            id: index + 1,
            name: `${user.name.first} ${user.name.last}`,
            title: lorem.generateParagraphs(1),
            address: `${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
          })
        );
        setCustomers(customerData);
        setSelectedCustomer(customerData[0]);
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };
    fetchCustomers();
  }, []);
  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="app">
      <header className="app-header">Customer Portal</header>
      <div className="app-content">
        <CustomerList
          customers={customers}
          onCustomerClick={handleCustomerClick}
          selectedCustomer={selectedCustomer}
        />
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};
export default App;
