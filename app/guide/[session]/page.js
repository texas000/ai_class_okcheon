import { notFound } from "next/navigation";
import Chat from "../../../components/chat.js";
import { COURSE_SESSIONS } from "../../../lib/practice-guide.js";
import { getRestaurantSummary, loadRestaurants } from "../../../lib/restaurants.js";

// /guide/1 ~ /guide/8의 페이지를 만듭니다. 다른 회차 주소는 404로 안내합니다.
export function generateStaticParams() {
  return COURSE_SESSIONS.map(({ number }) => ({ session: String(number) }));
}

export default async function GuidePage({ params }) {
  const { session } = await params;
  const lesson = COURSE_SESSIONS.find((item) => String(item.number) === session);
  if (!lesson) notFound();
  const restaurants = await loadRestaurants();
  return <Chat key={lesson.number} initialSession={lesson.number} restaurantSummary={getRestaurantSummary(restaurants)} />;
}
