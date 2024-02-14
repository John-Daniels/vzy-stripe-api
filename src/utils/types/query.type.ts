export interface queryType1 {
        sort?: 'asc' | 'desc',
        limit?: number,
        extended?: boolean,
        skip?: number,
}


export interface queryType2 {
        createdAt?: -1 | 1,
        limit?: number,
        extended?: boolean,
        skip?: number,
} 