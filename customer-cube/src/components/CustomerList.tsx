import React from "react";
interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}
interface Props {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}
const CustomerList: React.FC<Props> = ({
  customers,
  onCustomerClick,
  selectedCustomer,
}) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${
            selectedCustomer?.id === customer.id ? "selected" : ""
          }`}
          onClick={() => onCustomerClick(customer)}
        >
          <h4>{customer.name}</h4>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
};
export default CustomerList;
