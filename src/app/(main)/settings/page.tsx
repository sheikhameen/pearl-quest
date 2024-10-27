import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const Page = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Credits
      </h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">
              Project by:
            </TableCell>
            <TableCell>Asif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-muted-foreground">
              Class:
            </TableCell>
            <TableCell>Year 7 Pearl</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
