// Mock Users Data
export const users = [
    {
      id: '1',
      username: 'admin',
      password: 'admin123', // In real app, passwords would be hashed
      role: 'ADMIN',
      name: 'John Admin',
      email: 'admin@hospital.com'
    },
    {
      id: '2',
      username: 'tech',
      password: 'tech123',
      role: 'TECHNICIAN',
      name: 'Mike Tech',
      email: 'tech@hospital.com'
    },
    {
      id: '3',
      username: 'nurse',
      password: 'nurse123',
      role: 'STAFF',
      name: 'Sarah Nurse',
      email: 'nurse@hospital.com'
    }
  ];
  
  // Mock Equipment Data
  export const equipment = [
    {
      id: '1',
      name: 'Ventilator X2000',
      modelNumber: 'VX2000',
      serialNumber: 'SN20231001',
      department: 'ICU',
      status: 'AVAILABLE',
      dateAcquired: '2023-01-15',
      maintenanceInterval: 30, // days
      lastMaintenance: '2023-09-01',
      nextMaintenance: '2023-10-01',
      assignedTechnician: '2', // references tech user id
      qrCode: 'EQ-VX2000-001',
      image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg'
    },
    {
      id: '2',
      name: 'MRI Scanner Pro',
      modelNumber: 'MRI-4000',
      serialNumber: 'SN20231002',
      department: 'Radiology',
      status: 'UNDER_MAINTENANCE',
      dateAcquired: '2023-02-20',
      maintenanceInterval: 45,
      lastMaintenance: '2023-08-15',
      nextMaintenance: '2023-09-30',
      assignedTechnician: '2',
      qrCode: 'EQ-MRI4000-002',
      image: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg'
    },
    {
      id: '3',
      name: 'Patient Monitor Elite',
      modelNumber: 'PM-ELITE-3',
      serialNumber: 'SN20231003',
      department: 'Emergency',
      status: 'IN_USE',
      dateAcquired: '2023-03-10',
      maintenanceInterval: 60,
      lastMaintenance: '2023-08-30',
      nextMaintenance: '2023-10-30',
      assignedTechnician: '2',
      qrCode: 'EQ-PME3-003',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg'
    }
  ];
  
  // Mock Maintenance Reports
  export const reports = [
    {
      id: '1',
      equipmentId: '1',
      reporterId: '3',
      description: 'Unusual noise during operation',
      severity: 'HIGH',
      status: 'PENDING',
      dateReported: '2023-09-20',
      imageUrl: 'https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg',
      technicianNotes: '',
      estimatedFixTime: null
    },
    {
      id: '2',
      equipmentId: '2',
      reporterId: '3',
      description: 'Calibration needed',
      severity: 'MEDIUM',
      status: 'IN_PROGRESS',
      dateReported: '2023-09-18',
      imageUrl: null,
      technicianNotes: 'Ordered replacement parts',
      estimatedFixTime: '2023-09-25'
    }
  ];
  
  // Mock Notifications
  export const notifications = [
    {
      id: '1',
      userId: '2',
      title: 'New Maintenance Request',
      message: 'Ventilator X2000 requires immediate attention',
      isRead: false,
      createdAt: '2023-09-20T10:30:00Z'
    },
    {
      id: '2',
      userId: '1',
      title: 'Overdue Maintenance',
      message: 'MRI Scanner Pro maintenance is overdue',
      isRead: true,
      createdAt: '2023-09-19T08:15:00Z'
    }
  ];
  
  // Mock Dashboard Data
  export const dashboardData = {
    totalEquipment: 25,
    underMaintenance: 3,
    overdueRepairs: 1,
    monthlyStats: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    },
    departmentUsage: {
      ICU: 40,
      Radiology: 25,
      Emergency: 20,
      Surgery: 15
    }
  };
  
  // Constants
  export const STATUS_TYPES = {
    AVAILABLE: 'AVAILABLE',
    IN_USE: 'IN_USE',
    UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
    OUT_OF_ORDER: 'OUT_OF_ORDER'
  };
  
  export const SEVERITY_LEVELS = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
  };
  
  export const REPORT_STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED'
  };
  
  export const USER_ROLES = {
    ADMIN: 'ADMIN',
    TECHNICIAN: 'TECHNICIAN',
    STAFF: 'STAFF'
  };
  