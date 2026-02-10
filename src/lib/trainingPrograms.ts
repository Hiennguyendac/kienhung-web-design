import type { LucideIcon } from "lucide-react";
import { BrainCircuit, BriefcaseBusiness, Building2, Users } from "lucide-react";

export type TrainingProgram = {
  id: string;
  name: string;
  tagline?: string;
  level: string;
  duration: string;
  format: string;
  outcome: string;
  image: string;
  audience?: string;
  objectives?: string[];
  coreContent?: string[];
  deploymentFormat?: string[];
  roadmapPhases?: string[];
  baseFeeIncludes?: string[];
  pricingTiers?: Array<{
    scale: string;
    price: string;
    note: string;
  }>;
  pricingFootnote?: string;
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
      {
        id: "ai-training-consultant-awareness-tool-adoption",
        name: "AI Training - Consultant",
        tagline: "Awareness / Tool Adoption",
        level: "Doanh nghiệp",
        duration: "2 buổi tổng quan (3-4h/buổi)",
        format: "Workshop + Demo + Q&A theo phòng ban",
        outcome: "Giúp đội ngũ non-tech hiểu và ứng dụng AI ngay trong công việc văn phòng, marketing, ops, HR, admin.",
        image: "/education/program-ai.svg",
        audience: "Nhân sự non-tech, lần đầu tiếp cận AI; triển khai theo toàn công ty hoặc theo nhiều phòng ban.",
        objectives: [
          "Hiểu đúng AI là gì và dùng được ngay trong công việc.",
          "Xóa bỏ tâm lý 'ảo tưởng' hoặc 'sợ AI' khi triển khai trong doanh nghiệp.",
          "Tạo nền tảng nhận thức chung để các phòng ban cùng áp dụng.",
        ],
        coreContent: [
          "Tổng quan AI và xu hướng ứng dụng trong doanh nghiệp.",
          "Hướng dẫn sử dụng ChatGPT/Copilot hiệu quả theo vai trò.",
          "Demo automation cơ bản: email, báo cáo, nội dung, research.",
          "Best practices và các sai lầm thường gặp khi đưa AI vào vận hành.",
        ],
        deploymentFormat: [
          "2 buổi tổng quan (3-4 giờ/buổi).",
          "Có demo trực tiếp và Q&A theo từng phòng ban.",
          "Không yêu cầu dữ liệu nội bộ chuyên sâu để bắt đầu.",
        ],
        roadmapPhases: [
          "Discovery & Alignment",
          "Strategy & Roadmap Design",
          "Pilot / Applied Execution",
          "Enablement & Change Adoption",
          "Impact Review & Scale-up",
        ],
        pricingTiers: [
          { scale: "10-30", price: "40 - 80 triệu", note: "Nhóm nhỏ, tương tác cao" },
          { scale: "50", price: "80 - 90 triệu", note: "Workshop chuẩn doanh nghiệp" },
          { scale: "100", price: "100 - 120 triệu", note: "Enterprise workshop" },
        ],
      },
      {
        id: "ai-training-consultant-applied-ai-for-business",
        name: "AI Training - Consultant",
        tagline: "Applied AI for Business",
        level: "Doanh nghiệp",
        duration: "3-5 buổi (3-4h/buổi)",
        format: "Hands-on + case thực tế + customize theo phòng ban/ngành",
        outcome:
          "Đội ngũ ứng dụng AI trực tiếp vào công việc hằng ngày, xây workflow dùng thật trong nội bộ doanh nghiệp.",
        image: "/education/program-ai.svg",
        audience: "Nhân sự non-tech, lần đầu tiếp cận AI: văn phòng, marketing, ops, HR, admin.",
        objectives: [
          "Giúp đội ngũ ứng dụng AI trực tiếp vào công việc hằng ngày, không dừng ở mức biết công cụ.",
          "Chuẩn hóa cách sử dụng AI theo phòng ban và nghiệp vụ cụ thể.",
          "Tạo ra workflow AI có thể dùng lại trong nội bộ doanh nghiệp.",
          "Giảm thời gian xử lý công việc thủ công, tăng hiệu suất và chất lượng đầu ra.",
        ],
        coreContent: [
          "Tổng quan AI ứng dụng theo ngành và phòng ban (Marketing, Ops, HR, Sales, Data...).",
          "Hướng dẫn sử dụng AI tools nâng cao (ChatGPT, Copilot, automation tools) theo ngữ cảnh công việc.",
          "Thiết kế và thực hành workflow AI thực tế (viết - phân tích - tổng hợp - báo cáo - ra quyết định).",
          "Xây dựng Prompt Library và hướng dẫn sử dụng nội bộ.",
          "Phân tích các sai lầm thường gặp khi triển khai AI trong doanh nghiệp.",
          "Q&A và tối ưu workflow theo tình huống thực tế của doanh nghiệp.",
        ],
        deploymentFormat: [
          "Cấp certificate.",
          "3-5 buổi (3-4h/buổi).",
          "Hands-on + case thực tế.",
          "Customize theo phòng ban/ngành.",
          "Có workflow AI áp dụng thật và deliverable rõ ràng: Prompt Library, quy trình AI, demo/prototype.",
          "Oral test.",
          "Hỗ trợ hỏi - đáp sau training trong 4 tuần (hoặc tổng 28 ngày làm việc) từ 8:00 - 17:00.",
        ],
        roadmapPhases: [
          "Discovery & Alignment",
          "Strategy & Roadmap Design",
          "Pilot / Applied Execution",
          "Enablement & Change Adoption",
          "Impact Review & Scale-up",
        ],
        baseFeeIncludes: [
          "Phân tích nhu cầu và quy trình nghiệp vụ.",
          "Thiết kế nội dung theo ngành và phòng ban.",
          "Hands-on (online/offline).",
          "Xây dựng workflow AI áp dụng thực tế.",
          "Prompt Library và tài liệu nội bộ.",
          "Tổng kết và đề xuất hướng triển khai tiếp.",
        ],
        pricingTiers: [
          { scale: "Pilot / 1 phòng ban", price: "300 triệu", note: "10-20 người" },
          { scale: "Multi-team / 2-3 phòng ban", price: "300 - 400 triệu", note: "20-30 người" },
          { scale: "Enterprise Applied AI", price: "400 - 500 triệu", note: "30-40 người" },
        ],
        pricingFootnote: "Mở rộng quy mô vượt mức tham chiếu sẽ được đánh giá và báo giá lại theo phạm vi triển khai.",
      },
      {
        id: "ai-training-consultant-applied-ai-for-business-tech-track",
        name: "AI Training - Consultant (Tech Track)",
        tagline: "Applied AI for Business",
        level: "Doanh nghiệp - Tech",
        duration: "Đào tạo theo chuyên đề (3-5 buổi, theo scope kỹ thuật)",
        format: "Technical briefing + live coding/demo + hands-on theo nhóm nhỏ",
        outcome:
          "Nâng cao năng lực ứng dụng AI chuyên sâu cho đội Tech, chuẩn hóa thiết kế - triển khai - đánh giá hệ thống AI theo ngữ cảnh doanh nghiệp.",
        image: "/education/program-ai.svg",
        audience: "Nhân sự Tech - đào tạo theo chuyên đề.",
        objectives: [
          "Nâng cao năng lực ứng dụng AI chuyên sâu cho đội ngũ Tech theo từng chuyên đề.",
          "Chuẩn hóa tư duy thiết kế - triển khai - đánh giá hệ thống AI trong doanh nghiệp.",
          "Giúp đội ngũ giải quyết bài toán kỹ thuật thực tế, không chỉ học lý thuyết.",
          "Tạo nền tảng để xây dựng, mở rộng và tối ưu hệ thống AI nội bộ.",
        ],
        coreContent: [
          "Phân tích bài toán AI theo bối cảnh nghiệp vụ và hệ thống hiện tại.",
          "Thiết kế giải pháp AI theo chuyên đề.",
          "Applied ML / DL.",
          "LLM & RAG systems.",
          "AI Agent & Automation.",
          "MLOps & Deployment.",
          "Hands-on xây dựng pipeline AI hoàn chỉnh (data -> model -> inference -> monitoring).",
          "Review kiến trúc, code, workflow hiện có (nếu có).",
          "Best practices, trade-offs và lỗi triển khai thường gặp trong môi trường doanh nghiệp.",
        ],
        deploymentFormat: [
          "Đào tạo - tư vấn theo chuyên đề kỹ thuật cụ thể.",
          "Kết hợp technical briefing, live coding và demo.",
          "Hands-on theo nhóm nhỏ.",
          "Làm việc trực tiếp với tech team / key engineers.",
          "Áp dụng trên case study doanh nghiệp hoặc bài toán tương đương thực tế.",
          "Bàn giao slide kỹ thuật, code mẫu / notebook.",
          "Hỗ trợ giải đáp 14 ngày sau khi kết thúc training.",
          "Cung cấp tài liệu hướng dẫn và đề xuất cải tiến tiếp theo.",
        ],
        roadmapPhases: [
          "Discovery & Alignment",
          "Strategy & Roadmap Design",
          "Pilot / Applied Execution",
          "Enablement & Change Adoption",
          "Impact Review & Scale-up",
        ],
        pricingTiers: [
          { scale: "Pilot / 1 phòng ban", price: "350 triệu", note: "10-30 người" },
          { scale: "Multi-team / 2-3 phòng ban", price: "400 - 500 triệu", note: "40-50 người" },
          { scale: "Enterprise Applied AI", price: "> 500 triệu", note: "Chi phí theo mức độ phức tạp" },
        ],
        pricingFootnote: "Mở rộng quy mô vượt mức tham chiếu sẽ được đánh giá và báo giá lại theo phạm vi triển khai.",
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
