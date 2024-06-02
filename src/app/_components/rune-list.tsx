"use client";

import { useState, type FC } from "react";
import { useRunesStore } from "../../store/runes";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { type Rune } from "../../types/rune";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  RANKS,
  type RankId,
  SETS,
  type SetId,
  EFFECTS,
  type EffectId,
} from "../../lib/rune.mapping";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMobsStore } from "../../store/mobs";
import { type Mob } from "../../types/mob";

export type RuneTable = {
  set: string;
};

export const RuneList: FC = () => {
  const { addRunes, runes } = useRunesStore();
  const { addMobs } = useMobsStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleAddData = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(content);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addRunes(data.runes as unknown as Rune[]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addMobs(data.unit_list as unknown as Mob[]);
      }
    };

    if (!file) {
      return;
    }
    reader.readAsText(file);
  };

  const columns: ColumnDef<Rune>[] = [
    {
      accessorKey: "occupied_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "set_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Set
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
      cell: ({ getValue }) => SETS[getValue<SetId>()],
    },
    {
      accessorKey: "slot_no",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Slot
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "class",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "upgrade_curr",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Level
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "rank",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quality
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
      cell: ({ getValue }) => RANKS[getValue<RankId>()],
    },
    {
      accessorKey: "efficiency.current",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Eff. %
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "efficiency.max",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Max Eff. %
            {column.getIsSorted() !== false && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "pri_eff",
      header: "Main Stat",
      columns: [
        {
          accessorKey: "pri_eff.0",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Type
                {column.getIsSorted() !== false && (
                  <>
                    {column.getIsSorted() === "asc" ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowUp className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            );
          },
          cell: ({ getValue }) => {
            return EFFECTS[getValue<EffectId>()];
          },
        },
        {
          accessorKey: "pri_eff.1",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Value
                {column.getIsSorted() !== false && (
                  <>
                    {column.getIsSorted() === "asc" ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowUp className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            );
          },
        },
      ],
    },
    {
      accessorKey: "prefix_eff",
      header: "Innate Stat",
      columns: [
        {
          accessorKey: "prefix_eff.0",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Type
                {column.getIsSorted() !== false && (
                  <>
                    {column.getIsSorted() === "asc" ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowUp className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            );
          },
          cell: ({ getValue }) => {
            return EFFECTS[getValue<EffectId>()];
          },
        },
        {
          accessorKey: "prefix_eff.1",
          cell: ({ getValue }) => {
            const value = getValue<number>();
            return value ? value : "";
          },
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Value
                {column.getIsSorted() !== false && (
                  <>
                    {column.getIsSorted() === "asc" ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowUp className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            );
          },
        },
      ],
    },
    ...Object.keys(EFFECTS).map((effectId) => {
      return {
        accessorKey: `all_sec_eff.${effectId}`,
        header: EFFECTS[parseInt(effectId) as EffectId],
      };
    }),
  ];

  const table = useReactTable({
    data: runes,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <input
        type="file"
        onChange={(e) => handleAddData(e.target.files)}
        accept=".json"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          {runes.length} runes
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
