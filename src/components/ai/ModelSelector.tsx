import { AiMode } from "@/lib/aiTypes";

type ModelSelectorProps = {
  models: string[];
  value: string;
  mode: AiMode;
  onModeChange: (mode: AiMode) => void;
  onChange: (model: string) => void;
  disabled?: boolean;
};

export const ModelSelector = ({ models, value, mode, onModeChange, onChange, disabled = false }: ModelSelectorProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex rounded-full border border-border bg-background p-1 text-xs">
        {(["local", "remote"] as AiMode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onModeChange(item)}
            disabled={disabled}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              mode === item ? "bg-navy text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {item === "local" ? "Fast (local)" : "Latest (remote)"}
          </button>
        ))}
      </div>
      <label className="text-xs text-muted-foreground">Model</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {models.length === 0 ? (
          <option value="default">default</option>
        ) : (
          models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
