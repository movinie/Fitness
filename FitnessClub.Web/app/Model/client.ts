export interface IClient {
    ClientId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Gender: string;
    Date: string;
    City: string;
    Zip: string;
    Country: string;
    ClientSports: ISports[]    
}

export interface ISports {
    SportId: number;
    Name: string;
    Selected: boolean;
}