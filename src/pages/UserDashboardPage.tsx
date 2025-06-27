import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';

// Placeholder data for the dashboard
const orders = [
  {
    orderId: 'ECH789123',
    date: '2023-10-25',
    total: '$149.99',
    status: 'Delivered',
  },
  {
    orderId: 'ECH654321',
    date: '2023-10-20',
    total: '$35.50',
    status: 'Delivered',
  },
  {
    orderId: 'ECH987654',
    date: '2023-11-01',
    total: '$89.00',
    status: 'Processing',
  },
   {
    orderId: 'ECH321987',
    date: '2023-09-15',
    total: '$250.00',
    status: 'Cancelled',
  },
];

const addresses = [
    {
        id: 1,
        name: "John Doe",
        addressLine1: "123 Maple Street",
        addressLine2: "Apt 4B",
        cityStateZip: "Springfield, IL 62704",
        isDefault: true,
    },
    {
        id: 2,
        name: "John Doe",
        addressLine1: "456 Oak Avenue",
        addressLine2: "Work Office",
        cityStateZip: "Chicago, IL 60601",
        isDefault: false,
    }
];

const UserDashboardPage = () => {
    console.log('UserDashboardPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <AppHeader />
            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold mb-6">Your Account</h1>
                    <Tabs defaultValue="orders" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="orders">Order History</TabsTrigger>
                            <TabsTrigger value="addresses">Addresses</TabsTrigger>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                        </TabsList>
                        
                        {/* Order History Tab */}
                        <TabsContent value="orders">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Orders</CardTitle>
                                    <CardDescription>View the status and details of your past orders.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order.orderId}>
                                                    <TableCell className="font-medium">{order.orderId}</TableCell>
                                                    <TableCell>{order.date}</TableCell>
                                                    <TableCell>{order.total}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={
                                                            order.status === 'Delivered' ? 'default' :
                                                            order.status === 'Processing' ? 'secondary' : 'destructive'
                                                        }>
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm">View Details</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Addresses Tab */}
                        <TabsContent value="addresses">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Your Addresses</CardTitle>
                                        <CardDescription>Manage your saved shipping addresses.</CardDescription>
                                    </div>
                                    <Button>Add New Address</Button>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-2">
                                     {addresses.map((addr) => (
                                        <Card key={addr.id} className="flex flex-col">
                                            <CardHeader className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg">{addr.name}</CardTitle>
                                                    {addr.isDefault && <Badge variant="outline">Default</Badge>}
                                                </div>
                                                <CardDescription className="pt-2">
                                                    {addr.addressLine1}<br />
                                                    {addr.addressLine2 && <>{addr.addressLine2}<br /></>}
                                                    {addr.cityStateZip}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                            </CardFooter>
                                        </Card>
                                     ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Edit your personal details and manage your password.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" defaultValue="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};

export default UserDashboardPage;