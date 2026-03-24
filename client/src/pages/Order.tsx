import useBasket from "../hooks/useBasket";

export default function Order() {
  const { food } = useBasket();
  console.log(food);
  return <div>Order</div>;
}
