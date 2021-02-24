import { registerEnumType } from "type-graphql";

export enum UserRole {
  STANDARD = "STANDARD",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER ADMIN",
}

const ALL_ENUMS: {
  enum: typeof UserRole;
  name: string;
}[] = [
  {
    enum: UserRole,
    name: "UserRole",
  },
];

for (let e in ALL_ENUMS) {
  const ENUM = ALL_ENUMS[e];

  registerEnumType(ENUM.enum, {
    name: ENUM.name,
  });
}
