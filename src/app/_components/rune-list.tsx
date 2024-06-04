"use client";

import { useMemo, useState, type FC } from "react";
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
import { type Rune } from "../../lib/rune.mapping";
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
import { useFiltersStore } from "../../store/filters";

export type RuneTable = {
  set: string;
};

export const RuneList: FC = () => {
  const { runes } = useRunesStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { filters } = useFiltersStore();

  const dataFiltered = useMemo(() => {
    return runes.filter((rune) => {
      if (filters.sets.length) {
        if (!filters.sets.includes(rune.set_id)) {
          return false;
        }
      }

      if (filters.slots.length) {
        if (!filters.slots.includes(rune.slot_no)) {
          return false;
        }
      }

      return true;
    });
  }, [filters.sets, filters.slots, runes]);

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
    data: dataFiltered,
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap text-center"
                      colSpan={header.colSpan}
                    >
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
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap text-center"
                    >
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
                  colSpan={table.getAllFlatColumns().length}
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
