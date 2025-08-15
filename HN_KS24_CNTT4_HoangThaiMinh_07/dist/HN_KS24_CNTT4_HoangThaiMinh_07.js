let customerId = 1;
let vehicleId = 1;
let rentalId = 1;
class Customer {
    constructor(name, email, phone) {
        this.id = customerId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `Khách hàng: ${this.name} - Email: ${this.email} - Số điện thoại: ${this.phone}`;
    }
}
class Vehicle {
    constructor(type, rentalPricePerDay, isAvailable) {
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
}
class Car extends Vehicle {
    constructor(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    calculateRentalCost(days) {
        return this.rentalPricePerDay * days;
    }
    getFeatures() {
        return ["Điều hòa", "GPS dẫn đường"];
    }
    getInsurancePolicy() {
        return "Bảo hiểm toàn diện, miễn thường $500";
    }
}
class Motorcycle extends Vehicle {
    constructor(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    calculateRentalCost(days) {
        return this.rentalPricePerDay * days;
    }
    getFeatures() {
        return ["Mũ bảo hiểm đi kèm"];
    }
    getInsurancePolicy() {
        return "Bảo hiểm trách nhiệm dân sự cơ bản";
    }
}
class Truck extends Vehicle {
    constructor(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    calculateRentalCost(days) {
        return this.rentalPricePerDay * days;
    }
    getFeatures() {
        return ["Thùng hàng lớn", "Bửng nâng thủy lực"];
    }
    getInsurancePolicy() {
        return "Bảo hiểm hàng hóa và phương tiện thương mại";
    }
}
class Rental {
    constructor(customer, vehicle, days, totalCost) {
        this.id = rentalId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }
    getDetails() {
        return `Khách hàng thuê xe: ${this.customer} - Phương tiện thuê: ${this.vehicle} - Số ngày thuê: ${this.days} - Tổng chi phí: ${this.totalCost}`;
    }
}
class RentalAgency {
    constructor() {
        this.vehicles = [];
        this.customers = [];
        this.rentals = [];
    }
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }
    addCustomer(name, email, phone) {
        this.customers.push(new Customer(name, email, phone));
    }
    rentVehicle(customerId, vehicleId, days) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer)
            return null;
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle)
            return null;
    }
    returnVehicle(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle && vehicle.isAvailable === false) {
            console.log("Xe bạn muốn trả không phải xe của công ty");
        }
        else {
            vehicle.isAvailable = true;
        }
    }
    listAvailableVehicles() {
        this.vehicles.filter(v => v.isAvailable === true).forEach(v => {
            console.log(`Loại xe: ${v.type} - Giá cho thuê: ${v.rentalPricePerDay}/ngày`);
        });
    }
    listCustomerRentals(customerId) {
        this.rentals.filter(r => r.id === customerId).forEach(r => {
            console.log(r.getDetails());
        });
    }
    calculateTotalRevenue() {
        return this.rentals.reduce((sum, r) => sum + r.totalCost, 0);
    }
    getVehicleTypeCount() {
        const counts = this.vehicles.reduce((acc, v) => {
            const cat = v.type;
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        console.log(counts);
    }
    getVehicleFeatures(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle)
            console.log(vehicle.getFeatures());
    }
    getVehicleInsurance(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle)
            console.log(vehicle.getInsurancePolicy);
    }
}
const rentalAgency = new RentalAgency();
// 1. Thêm khách hàng mới
rentalAgency.addCustomer("Minh", "lemonboy2k6@gmail.com", "0332375399");
// 2. Thêm phương tiện mới
