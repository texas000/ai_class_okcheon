-- 수업용 가상 데이터만 담는 독립 테이블입니다. 기존 앱 테이블은 변경하지 않습니다.
CREATE TABLE IF NOT EXISTS public.lesson_five_samples (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 다시 실행해도 같은 샘플이 중복되거나 수정된 기록이 덮어써지지 않습니다.
INSERT INTO public.lesson_five_samples (id, title, category, status) VALUES
  ('sample-01', 'AI 수업 복습하기', '학습', '진행 중'),
  ('sample-02', '앱 화면 스케치하기', '앱 만들기', '완료'),
  ('sample-03', 'DB 연결 확인하기', '실습', '예정')
ON CONFLICT (id) DO NOTHING;
