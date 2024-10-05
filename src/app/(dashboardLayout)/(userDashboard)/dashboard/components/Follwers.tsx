import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Image from 'next/image';
import { Button } from '@nextui-org/react';

const Followers = ({ followers, following }: {
  followers: { img: string; name: string; email: string }[];
  following: { img: string; name: string, email: string }[];

}) => {
  return (
    <div className="mt-10">
      {/* Followers Table */}
      <h1 className="text-xl font-bold mb-5">Followers</h1>
      <Table aria-label="Followers table">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {followers.map((follower, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={follower.img || '/path/to/default-profile-picture.jpg'}
                  alt={follower.name}
                  width={60}
                  height={60}
                  className=" rounded-md "
                />
              </TableCell>
              <TableCell>{follower.name}</TableCell>
              <TableCell>{follower.email}</TableCell>
              <TableCell>
                <Button>

                  Mail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* Following Table */}
      <h1 className="text-xl font-bold mb-5 mt-10">Following</h1>
      <Table aria-label="Following table">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
        </TableHeader>
        <TableBody>
          {following.map((follow, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={follow.img || '/path/to/default-profile-picture.jpg'}
                  alt={follow.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{follow.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Followers;
