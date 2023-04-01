import { Select } from "@mantine/core";

export default function SelectBatch({value,onChange}){
    return(
        <Select
        label="Batch"
        placeholder="Select Batch"
        searchable
        nothingFound="No options"
        value={value}
        onChange={onChange}
        data={[
              { value: "Batch 1", label: "Batch 1" },
              { value: "Batch 2", label: "Batch 2" }
        ]}
      />
    );
}