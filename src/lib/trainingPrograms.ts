import type { LucideIcon } from "lucide-react";
import { BrainCircuit, BriefcaseBusiness, Building2, Users } from "lucide-react";

export type TrainingProgram = {
  id: string;
  name: string;
  level: string;
  duration: string;
  format: string;
  outcome: string;
  image: string;
};

export type TrainingDomain = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  coverImage: string;
  icon: LucideIcon;
  programs: TrainingProgram[];
};

export const trainingDomains: TrainingDomain[] = [
  {
    id: "ai-data",
    title: "AI & Khoa học dữ liệu",
    summary: "Đào tạo năng lực xây dựng, đánh giá và ứng dụng mô hình AI trong bài toán doanh nghiệp.",
    audience: "Kỹ sư, nhân sự phân tích dữ liệu, đội vận hành chuyển đổi số",
    coverImage: "/education/cover-ai.svg",
    icon: BrainCircuit,
    programs: [
      {
        id: "nen-tang-ai-ung-dung-cho-doanh-nghiep",
        name: "Nền tảng AI ứng dụng cho doanh nghiệp",
        level: "Cơ bản",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Hiểu kiến trúc AI hiện đại và xây dựng được quy trình ứng dụng trong phòng ban.",
        image: "/education/program-ai.svg",
      },
      {
        id: "computer-vision-voi-yolo-va-bai-toan-giam-sat",
        name: "Computer Vision với YOLO và bài toán giám sát",
        level: "Trung cấp",
        duration: "08 tuần",
        format: "Offline + Lab",
        outcome: "Triển khai pipeline nhận diện vật thể và đánh giá hiệu năng theo ngữ cảnh vận hành thực tế.",
        image: "/education/program-ai.svg",
      },
      {
        id: "mlops-va-van-hanh-mo-hinh-trong-san-xuat",
        name: "MLOps và vận hành mô hình trong sản xuất",
        level: "Chuyên sâu",
        duration: "08 tuần",
        format: "Workshop chuyên đề",
        outcome: "Thiết lập vòng đời mô hình từ huấn luyện đến theo dõi drift và tối ưu liên tục.",
        image: "/education/program-ai.svg",
      },
    ],
  },
  {
    id: "digital-transformation",
    title: "Chuyển đổi số & Tự động hóa",
    summary: "Thiết kế quy trình số, tự động hóa tác vụ và nâng cao năng suất vận hành doanh nghiệp.",
    audience: "Quản lý vận hành, PM, đội CNTT nội bộ",
    coverImage: "/education/cover-digital.svg",
    icon: Building2,
    programs: [
      {
        id: "kien-truc-chuyen-doi-so-theo-phong-ban",
        name: "Kiến trúc chuyển đổi số theo phòng ban",
        level: "Cơ bản",
        duration: "05 tuần",
        format: "Online Live",
        outcome: "Xây được bản đồ quy trình số và lộ trình triển khai theo ưu tiên kinh doanh.",
        image: "/education/program-digital.svg",
      },
      {
        id: "tu-dong-hoa-quy-trinh-voi-cong-cu-no-code",
        name: "Tự động hóa quy trình với công cụ no-code",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Thiết kế được workflow tự động cho tác vụ báo cáo, CRM và vận hành nội bộ.",
        image: "/education/program-digital.svg",
      },
      {
        id: "quan-tri-du-lieu-cho-doanh-nghiep-so",
        name: "Quản trị dữ liệu cho doanh nghiệp số",
        level: "Chuyên sâu",
        duration: "06 tuần",
        format: "Offline + Case Study",
        outcome: "Chuẩn hóa dữ liệu và xây dashboard phục vụ ra quyết định quản trị.",
        image: "/education/program-digital.svg",
      },
    ],
  },
  {
    id: "business-finance",
    title: "Tài chính, Đầu tư & Phân tích kinh doanh",
    summary: "Nâng cao năng lực phân tích tài chính và ra quyết định đầu tư dựa trên dữ liệu.",
    audience: "Chuyên viên tài chính, nhà quản lý, chủ doanh nghiệp",
    coverImage: "/education/cover-finance.svg",
    icon: BriefcaseBusiness,
    programs: [
      {
        id: "phan-tich-tai-chinh-doanh-nghiep-thuc-chien",
        name: "Phân tích tài chính doanh nghiệp thực chiến",
        level: "Cơ bản",
        duration: "06 tuần",
        format: "Offline",
        outcome: "Đọc và phân tích báo cáo tài chính để đánh giá hiệu quả hoạt động doanh nghiệp.",
        image: "/education/program-finance.svg",
      },
      {
        id: "quan-tri-danh-muc-dau-tu-theo-chu-ky-thi-truong",
        name: "Quản trị danh mục đầu tư theo chu kỳ thị trường",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Xây khung phân bổ tài sản và quản trị rủi ro theo mục tiêu lợi nhuận.",
        image: "/education/program-finance.svg",
      },
      {
        id: "business-analytics-cho-lanh-dao",
        name: "Business Analytics cho lãnh đạo",
        level: "Chuyên sâu",
        duration: "05 tuần",
        format: "Workshop",
        outcome: "Ứng dụng mô hình phân tích để tối ưu doanh thu, chi phí và dòng tiền.",
        image: "/education/program-finance.svg",
      },
    ],
  },
  {
    id: "management-people",
    title: "Quản trị điều hành & Phát triển đội ngũ",
    summary: "Tập trung kỹ năng lãnh đạo, quản trị hiệu suất và xây hệ thống học tập cho tổ chức.",
    audience: "Trưởng nhóm, quản lý trung cấp, lãnh đạo đơn vị",
    coverImage: "/education/cover-management.svg",
    icon: Users,
    programs: [
      {
        id: "nang-luc-quan-tri-danh-cho-quan-ly-cap-trung",
        name: "Năng lực quản trị dành cho quản lý cấp trung",
        level: "Cơ bản",
        duration: "05 tuần",
        format: "Offline",
        outcome: "Nâng năng lực lập kế hoạch, giao việc, theo dõi KPI và phản hồi hiệu quả.",
        image: "/education/program-management.svg",
      },
      {
        id: "coaching-noi-bo-va-phat-trien-nhan-su-ke-thua",
        name: "Coaching nội bộ và phát triển nhân sự kế thừa",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Thiết kế chương trình coaching để phát triển đội ngũ và giữ chân nhân sự chủ chốt.",
        image: "/education/program-management.svg",
      },
      {
        id: "van-hoa-hieu-suat-va-quan-tri-thay-doi",
        name: "Văn hóa hiệu suất và quản trị thay đổi",
        level: "Chuyên sâu",
        duration: "06 tuần",
        format: "Workshop + Mentoring",
        outcome: "Xây cơ chế vận hành thay đổi phù hợp quy mô doanh nghiệp và mục tiêu tăng trưởng.",
        image: "/education/program-management.svg",
      },
    ],
  },
];

export const findDomainById = (domainId?: string) =>
  trainingDomains.find((domain) => domain.id === domainId);

export const findProgramByIds = (domainId?: string, programId?: string) => {
  const domain = findDomainById(domainId);
  if (!domain) return undefined;
  const program = domain.programs.find((item) => item.id === programId);
  if (!program) return undefined;
  return { domain, program };
};
