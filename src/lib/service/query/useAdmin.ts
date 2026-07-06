"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDoctorApplications,
  approveDoctorApplication,
  rejectDoctorApplication,
  changeDoctorStatusUnified,
} from "../functions/admin.service";

export const useDoctorApplications = () => {
  return useQuery({
    queryKey: ["doctor_applications"],
    queryFn: async () => {
      const res = await getDoctorApplications();
      if (!res.success) {
        throw new Error(res.message || "Failed to fetch doctor applications");
      }
      const data = res.data as any;
      if (Array.isArray(data)) {
        return data;
      }
      if (data && typeof data === "object" && "content" in data && Array.isArray(data.content)) {
        return data.content;
      }
      return [];
    },
  });
};

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await approveDoctorApplication(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to approve doctor");
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_applications"] });
    },
  });
};

export const useRejectDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const res = await rejectDoctorApplication(id, reason);
      if (!res.success) {
        throw new Error(res.message || "Failed to reject doctor");
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_applications"] });
    },
  });
};

export const useChangeDoctorStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, reason }: { id: string; status: string; reason?: string }) => {
      const res = await changeDoctorStatusUnified(id, status, reason);
      if (!res.success) {
        throw new Error(res.message || "Failed to change doctor status");
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_applications"] });
    },
  });
};
