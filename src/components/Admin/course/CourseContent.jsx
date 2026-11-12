import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../state-mangement/contextApi";
import Spinner from "../../../Spinner/Spinner";
import Styles from "./_courseContent.module.css";

const CourseContent = () => {
  const { id } = useParams();

  const { getCourseContent } = useContext(AuthContext);

  const [courseContent, setCourseContent] = useState(null);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await getCourseContent(id);

        console.log("COURSE CONTENT RESPONSE:", response);

        setCourseContent(response);
      } catch (error) {
        console.log("COURSE CONTENT ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.message);
      }
    };

    fetchCourseContent();
  }, [id, getCourseContent]);

  if (!courseContent) {
    return <Spinner />;
  }

 return (
  <section className={Styles.course_content}>
    <h1>Course Content</h1>

    {courseContent.content?.length === 0 ? (
      <p className={Styles.no_content}>No course content found.</p>
    ) : (
      <div className={Styles.content_list}>
        {courseContent.content?.map((item, index) => (
          <article
            className={Styles.content_card}
            key={item._id}
          >
            <div className={Styles.card_header}>
              <span className={Styles.lesson_number}>
                Lesson {index + 1}
              </span>

              {item.isPreview && (
                <span className={Styles.preview}>
                  Preview
                </span>
              )}
            </div>

            <h2>{item.title}</h2>

            <p className={Styles.description}>
              {item.description}
            </p>

            <div className={Styles.details}>
              <p>
                <strong>Section:</strong>{" "}
                {item.videoSection}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {item.videoLength} minutes
              </p>
            </div>

            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.watch_btn}
            >
              ▶ Watch Video
            </a>
          </article>
        ))}
      </div>
    )}
  </section>
);
};

export default CourseContent;