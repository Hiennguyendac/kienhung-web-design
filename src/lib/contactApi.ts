import { supabase } from "@/integrations/supabase/client";

export type ContactFormType = "contact" | "newsletter" | "quote" | "schedule";

export type ContactPayload =
  | {
      type: "contact";
      payload: {
        name: string;
        phone: string;
        email: string;
        company?: string;
        message: string;
      };
    }
  | {
      type: "newsletter";
      payload: {
        email: string;
      };
    }
  | {
      type: "quote";
      payload: {
        goal: string;
        budget?: string;
        timeline?: string;
        partner?: string;
        note?: string;
        name: string;
        phone: string;
        email: string;
        company?: string;
        service: string;
        detail: string;
      };
    }
  | {
      type: "schedule";
      payload: {
        name: string;
        phone: string;
        email: string;
        service: string;
        date: string;
        slot: string;
      };
    };

export type ContactResponse = {
  ok: boolean;
  emailSent?: boolean;
  id?: string;
  error?: string;
};

export async function submitContact(payload: ContactPayload) {
  const { data, error } = await supabase.functions.invoke<ContactResponse>("contact-intake", {
    body: {
      ...payload,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.ok) {
    throw new Error(data?.error || "Submit failed");
  }

  return data;
}
