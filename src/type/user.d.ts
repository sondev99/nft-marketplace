interface UserInfo {
  id: string;

  firstName: string;

  lastName: string;

  imageUrl: string | undefined;

  email: string;

  phone: string;

  role: String | undefined;

  walletAddress: string;

  addresses: Address;
}

interface Address {
  id: string;

  fullAddress: string;

  district: string;

  city: string;
}

interface Role {
  id: string;
  roleName: string;
}
