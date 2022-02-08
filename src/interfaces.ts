export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  empIds: number[];
}

export interface ProjectColumnDef {
  key: string;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
}

export interface EmployeeColumnDef {
  key: string;
  name: string;
}

export interface ProjectToUpdate {
  name: string;
  description: string;
  startDate: string;
  empIds: number[];
}

export interface EmployeeToUpdate {
  name: string;
}

export interface ApiProject {
  id: number;
  name: string;
  description: string;
  date: string;
  empIds: number[];
}

export interface ApiProjectToUpdate {
  name: string;
  description: string;
  date: string;
  empIds: number[];
}
