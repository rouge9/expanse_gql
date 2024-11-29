import { useQuery } from "@apollo/client";
import Card from "./Card";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";

const Cards = () => {
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data, loading, error } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          !error &&
          data?.user?.transactions.map((transaction, index) => (
            <Card key={index} {...transaction} authUser={authUser?.authUser} />
          ))}
      </div>
      {!loading && !error && data?.user?.transactions.length === 0 && (
        <p className="text-2xl font-bold text-center my-10">
          No transactions found
        </p>
      )}
    </div>
  );
};
export default Cards;
