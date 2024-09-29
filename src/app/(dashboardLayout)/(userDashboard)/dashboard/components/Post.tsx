import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import React from 'react';

const Post = () => {
    const demoPosts = [
        { id: 1, name: 'First Post', date: '2024-09-01', published: 'Yes' },
        { id: 2, name: 'Second Post', date: '2024-09-10', published: 'No' },
        { id: 3, name: 'Third Post', date: '2024-09-15', published: 'Yes' },
        { id: 4, name: 'Fourth Post', date: '2024-09-20', published: 'Yes' },
      ];
    
    return (
        <div className='mt-10'>
      <h1 className='text-xl font-bold mb-5'>POST HISTORY</h1>
      <Table aria-label="Post history table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>PUBLISHED</TableColumn>
        </TableHeader>
        <TableBody>
          {demoPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.name}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
};

export default Post;