import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state-mangement/contextApi";
import Spinner from "../../../Spinner/Spinner";

const UsersAnalytics = () => {
  const { getUsersAnalytics } = useContext(AuthContext);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchUsersAnalytics = async () => {
      try {
        const response = await getUsersAnalytics();

        console.log(
          "USERS ANALYTICS RESPONSE:",
          response
        );

        setAnalytics(response);
      } catch (error) {
        console.log(
          "USERS ANALYTICS ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsersAnalytics();
  }, [getUsersAnalytics]);

  if (!analytics) {
    return <Spinner />;
  }

  const monthlyUsers =
    analytics?.users?.last12Months || [];

  return (
    <section>
      <h1>Users Analytics</h1>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>New Users</th>
          </tr>
        </thead>

        <tbody>
          {monthlyUsers.length === 0 ? (
            <tr>
              <td colSpan="2">
                No user analytics found
              </td>
            </tr>
          ) : (
            monthlyUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default UsersAnalytics;