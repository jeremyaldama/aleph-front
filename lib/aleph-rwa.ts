import {
  type AggregatedOrderResponseDto,
  type CommitOrderDto,
  Configuration,
  type CreatePoolDto,
  type PurchasePoolResponseDto,
  type RetailerDashboardProductResponseDto,
  RwaApi,
} from "@/generated/aleph-be";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ALEPH_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost";

function getRwaApi(accessToken?: string) {
  return new RwaApi(
    new Configuration({
      basePath: API_BASE_URL,
      accessToken,
    }),
  );
}

export const MOCK_RETAILER_PRODUCTS: RetailerDashboardProductResponseDto[] = [
  {
    sku: "cooking-oil-5l",
    name: "Cooking Oil 5L",
    category: "Essential Groceries",
    supplierName: "Andes Wholesale Supply",
    unit: "container",
    unitPrice: 18.75,
    minimumOrderQuantity: 20,
    availableQuantity: 1400,
    imageUrl:
      "https://images.unsplash.com/photo-1582582494700-6f67f95c6f68?auto=format&fit=crop&w=900&q=80",
    tags: ["high-turnover", "price-protected"],
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "rice-25kg",
    name: "Premium White Rice 25kg",
    category: "Staples",
    supplierName: "Pacifica Grain Network",
    unit: "bag",
    unitPrice: 31.4,
    minimumOrderQuantity: 15,
    availableQuantity: 900,
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    tags: ["bulk-discount", "stable-pricing"],
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "uht-milk-1l",
    name: "UHT Milk 1L",
    category: "Dairy",
    supplierName: "Lactea Integrations",
    unit: "carton",
    unitPrice: 1.92,
    minimumOrderQuantity: 180,
    availableQuantity: 18000,
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
    tags: ["cold-chain", "daily-demand"],
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "frozen-chicken-2kg",
    name: "Frozen Chicken Portions 2kg",
    category: "Frozen Proteins",
    supplierName: "Frio Norte Foods",
    unit: "box",
    unitPrice: 9.8,
    minimumOrderQuantity: 60,
    availableQuantity: 6000,
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
    tags: ["high-margin", "weekly-reorder"],
    updatedAt: new Date().toISOString(),
  },
];

export const WORKFLOW_POOL_STORAGE_KEY = "aleph_workflow_pool_v1";

export type WorkflowStage =
  | "browsing"
  | "pool_open"
  | "threshold_reached"
  | "tokenized";

export type WorkflowParticipant = {
  merchantId: string;
  quantity: number;
};

export type WorkflowPoolState = {
  poolId: string;
  poolName: string;
  sku: string;
  productName: string;
  threshold: number;
  pledgedQuantity: number;
  stage: WorkflowStage;
  supplierName: string;
  orderId?: string;
  tokenizedAt?: string;
  estimatedDelivery?: string;
  participants: WorkflowParticipant[];
};

export async function getRetailerDashboardProducts(
  accessToken?: string,
): Promise<RetailerDashboardProductResponseDto[]> {
  try {
    const api = getRwaApi(accessToken);
    const { data } = await api.rwaControllerGetRetailerDashboardProducts();
    return data.products;
  } catch {
    return MOCK_RETAILER_PRODUCTS;
  }
}

export async function createPurchasePool(
  payload: CreatePoolDto,
  accessToken?: string,
): Promise<PurchasePoolResponseDto> {
  const api = getRwaApi(accessToken);
  const { data } = await api.rwaControllerCreatePool(payload);
  return data;
}

export async function commitRetailerOrder(
  payload: CommitOrderDto,
  accessToken?: string,
) {
  const api = getRwaApi(accessToken);
  const { data } = await api.rwaControllerCommitOrder(payload);
  return data;
}

export async function aggregatePool(
  poolId: string,
  accessToken?: string,
): Promise<AggregatedOrderResponseDto> {
  const api = getRwaApi(accessToken);
  const { data } = await api.rwaControllerAggregate({ poolId });
  return data;
}

export async function tokenizeAggregatedOrder(
  orderId: string,
  accessToken?: string,
): Promise<AggregatedOrderResponseDto> {
  const api = getRwaApi(accessToken);
  const { data } = await api.rwaControllerTokenize({ orderId });
  return data;
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.localStorage.getItem("aleph_access_token") ?? undefined;
}

export function getStoredRetailerId() {
  if (typeof window === "undefined") {
    return "merchant-001";
  }

  const raw = window.localStorage.getItem("aleph_user");
  if (!raw) {
    return "merchant-001";
  }

  try {
    const parsed = JSON.parse(raw) as { id?: string };
    return parsed.id ?? "merchant-001";
  } catch {
    return "merchant-001";
  }
}

export function loadWorkflowPoolState(): WorkflowPoolState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(WORKFLOW_POOL_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as WorkflowPoolState;
  } catch {
    return null;
  }
}

export function saveWorkflowPoolState(state: WorkflowPoolState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(WORKFLOW_POOL_STORAGE_KEY, JSON.stringify(state));
}

export function clearLocalSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("aleph_access_token");
  window.localStorage.removeItem("aleph_user");
  window.localStorage.removeItem(WORKFLOW_POOL_STORAGE_KEY);
}
