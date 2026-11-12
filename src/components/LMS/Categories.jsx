import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/fetchUser";

const Categories = () => {
  const { getCategories } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        console.log("CATEGORIES:", response);

        setCategories(response?.categories || []);
      } catch (error) {
        console.log(
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <h2>Loading categories...</h2>;
  }

  return (
    <section>
      <h1>Course Categories</h1>

      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        categories.map((category, index) => (
          <div key={index}>
            <h3>{category.title}</h3>
            <p>Courses: {category.count}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Categories;