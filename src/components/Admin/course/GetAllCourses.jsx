import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state-mangement/contextApi";
import Spinner from "../../../Spinner/Spinner";

const GetAllCourses = () => {
  const { getAllAdminCourses } = useContext(AuthContext);

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllAdminCourses();

        console.log("GET ALL COURSES:", response);

        setCourses(response?.courses || []);
      } catch (error) {
        console.log(
          error.response?.data || error.message
        );

        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  if (courses === null) {
    return <Spinner />;
  }

  return (
    <section>
      <h1>All Courses</h1>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Level</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="6">No courses found</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course._id}>
                <td>
                  <img
                    src={course.thumbnail?.url}
                    alt={course.name}
                    width="80"
                  />
                </td>

                <td>{course.name}</td>
                <td>{course.category}</td>
                <td>{course.level}</td>
                <td>₹{course.price}</td>
                <td>{course.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default GetAllCourses;