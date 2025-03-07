import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    label: string;
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, label, checked, onChange }: Props) {

    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <FormGroup>
                {items.map(item =>
                    <FormControlLabel
                        checked={checkedItems.findIndex(i => i === item) !== -1}
                        control={
                            <Checkbox
                                key={item}
                                onChange={() => handleChecked(item)}
                            />
                        }
                        label={item}
                        key={item} />
                )}
            </FormGroup>
        </FormControl>
    )
}
