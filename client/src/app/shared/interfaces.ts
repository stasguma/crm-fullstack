export interface User {
    email: string;
    password: string;
}

export interface Message {
    message: string;
}

export interface Category {
    name: string;
    imageSrc?: string;
    cloudImageSrc?: string;
    user?: string;
    _id?: string;
}

export interface Position {
    name: string;
    cost: number;
    category?: string;
    user?: string;
    _id?: string;
    quantity?: number;
}

export interface Order {
    list: any[];
    date?: Date;
    order?: number;
    user?: string;
    _id?: string;
}

export interface OrderPosition {
    name: string;
    cost: number;
    quantity?: number;
    _id?: string;
}

export interface Filter {
    start?: Date;
    end?: Date;
    order?: number;
}

export interface OverviewPage {
    gain: OverviewPageItem;
    orders: OverviewPageItem;
}

export interface OverviewPageItem {
    percent: number;
    compare: number;
    yesterday: number;
    isHigher: boolean;
}

export interface AnalyticsPage {
    average: number;
    chart: AnalyticsChartItem[];
}

export interface AnalyticsChartItem {
    gain: number;
    order: number;
    label: string;
}
