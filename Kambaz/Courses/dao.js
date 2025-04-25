import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

import enroll_model from "../Enrollments/model.js";


export function findAllCourses() {
  return model.find();

}

import CourseModel from "./model.js";

async function findCourses() {
  return await model.find().lean();    // array of plain objects
}

async function findEnrollments() {
  return await enroll_model.find().lean();    // array of plain objects
}


export async function findCoursesForEnrolledUser(userId) {
  const [courses, enrollments] = await Promise.all([
    findCourses(),
    findEnrollments(),
  ]);

  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}