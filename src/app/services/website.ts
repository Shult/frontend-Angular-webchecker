export interface Website {
    url: string;
    status: string;
    responseTime: number;
    screen: string;
    retryCount: number;
}

export interface ApiResponse {
  results: Website[];
  logs: string;
  nbTotalSites: number;
  nbUpSites: number;
  nbDownSites: number;
  nbTimeoutSites: number;
}

export interface ApiResponseRust {
  websites: WebsiteRust,
}

export interface WebsiteRust{
  url: string;
  status: string;
  screenshot: string
}
