let customerId = 1;
let vehicleId = 1;
let rentalId = 1;

class Customer {
    public readonly id: number;
    public name: string;
    public email: string;
    public phone: string;

    constructor(name: string, email: string, phone: string) {
        this.id = customerId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    getDetails(): string {
        return `Khách hàng: ${this.name} - Email: ${this.email} - Số điện thoại: ${this.phone}`;
    }
}

abstract class Vehicle {
    public readonly id: number;
    public type: string;
    public rentalPricePerDay: number;
    public isAvailable: boolean;

    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean) {
        this.id = vehicleId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = isAvailable;
    }

    rent() {
        this.isAvailable = false;
    }

    returnVehicle() {
        this.isAvailable = true;
    }

    abstract calculateRentalCost(days: number): number;
    abstract getFeatures(): string [];
    abstract getInsurancePolicy(): string;
}

class Car extends Vehicle {
    feature: string[];
    insurancePolicy: string;

    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }

    calculateRentalCost(days: number): number {
        return this.rentalPricePerDay*days;
    }

    getFeatures(): string[] {
        return ["Điều hòa", "GPS dẫn đường"];
    }

    getInsurancePolicy(): string {
        return "Bảo hiểm toàn diện, miễn thường $500";
    }
}

class Motorcycle extends Vehicle {
    feature: string[];
    insurancePolicy: string;

    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }

    calculateRentalCost(days: number): number {
        return this.rentalPricePerDay*days;
    }

    getFeatures(): string[] {
        return ["Mũ bảo hiểm đi kèm"];
    }

    getInsurancePolicy(): string {
        return "Bảo hiểm trách nhiệm dân sự cơ bản";
    }
}

class Truck extends Vehicle {
    feature: string[];
    insurancePolicy: string;

    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }

    calculateRentalCost(days: number): number {
        return this.rentalPricePerDay*days;
    }

    getFeatures(): string[] {
        return ["Thùng hàng lớn", "Bửng nâng thủy lực"];
    }

    getInsurancePolicy(): string {
        return "Bảo hiểm hàng hóa và phương tiện thương mại";
    }
}

class Rental {
    public readonly id: number;
    public customer: string;
    public vehicle: Vehicle;
    public days: number;
    public totalCost: number;

    constructor(customer: string, vehicle: Vehicle, days: number, totalCost: number) {
        this.id = rentalId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }

    getDetails(): string {
        return `Khách hàng thuê xe: ${this.customer} - Phương tiện thuê: ${this.vehicle} - Số ngày thuê: ${this.days} - Tổng chi phí: ${this.totalCost}`
    }
}

class RentalAgency {
    public vehicles: Vehicle[] = [];
    public customers: Customer[] = [];
    public rentals: Rental[] = [];

    addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
    }

    addCustomer(name: string, email: string, phone: string): void {
        this.customers.push(new Customer(name, email, phone));
    }

    rentVehicle(customerId: number, vehicleId: number, days: number): Rental | null {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) return null;
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return null;
        
    }

    returnVehicle(vehicleId: number): void {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle && vehicle.isAvailable === false) {
            console.log("Xe bạn muốn trả không phải xe của công ty");
        } else {
            vehicle.isAvailable = true;
        }
    }

    listAvailableVehicles(): void {
        this.vehicles.filter(v => v.isAvailable === true).forEach(v => {
            console.log(`Loại xe: ${v.type} - Giá cho thuê: ${v.rentalPricePerDay}/ngày`);
        });
    }

    listCustomerRentals(customerId: number): void {
        this.rentals.filter(r => r.id === customerId).forEach(r => {
            console.log(r.getDetails());
        });
    }

    calculateTotalRevenue(): number {
        return this.rentals.reduce((sum, r) => sum + r.totalCost, 0);
    }

    getVehicleTypeCount(): void {
        const counts = this.vehicles.reduce((acc, v) => {
            const cat = v.type;
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        console.log(counts);
    }

    getVehicleFeatures(vehicleId: number): void {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) console.log(vehicle.getFeatures());
    }

    getVehicleInsurance(vehicleId: number): void {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) console.log(vehicle.getInsurancePolicy);
    }
}

const rentalAgency = new RentalAgency();

// 1. Thêm khách hàng mới
rentalAgency.addCustomer("Minh","lemonboy2k6@gmail.com","0332375399");

// 2. Thêm phương tiện mới
