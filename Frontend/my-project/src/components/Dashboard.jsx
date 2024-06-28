import React from "react";

function Dashboard() {
  // Dummy data for the table
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "User",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "Admin",
    },
  ];

  return (
    <div className="dashboard-container p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
                ID
              </th>
              <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-3">{user.id}</td>
                <td className="py-2 px-3">{user.name}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
