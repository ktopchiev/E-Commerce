import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
    return (
        <FormControl component="fieldset">
            <FormLabel>Sort by</FormLabel>
            <RadioGroup
                defaultValue="name"
                onChange={onChange}
                value={selectedValue}
            >
                {options.map(({ value, label }) =>
                    <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={label}
                        key={value}
                    />
                )}

            </RadioGroup>
        </FormControl>
    )
}