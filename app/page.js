import Chat from "../components/chat.js";
import { getRestaurantSummary, loadRestaurants } from "../lib/restaurants.js";

// Next.js에서 app/page.js는 홈페이지(/)를 의미합니다.
// 실제 채팅 화면은 components/chat.js에 모아두었습니다.
export default async function Home() {
  // 서버에서 데이터의 건수와 기준일만 읽어 화면에 전달합니다.
  const restaurants = await loadRestaurants();
  return <Chat restaurantSummary={getRestaurantSummary(restaurants)} />;
}
