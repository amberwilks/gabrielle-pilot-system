import { useState } from "react";

const ENERGY_LEVELS = [
  { value: 1, label: "Running on empty", emoji: "🔋", color: "#EF4444", bg: "#FEE2E2", desc: "Bare minimum today" },
  { value: 2, label: "Low energy", emoji: "🌧️", color: "#F59E0B", bg: "#FEF3C7", desc: "Basics only" },
  { value: 3, label: "Doing okay", emoji: "☁️", color: "#6366F1", bg: "#EDE9FE", desc: "Normal routine" },
  { value: 4, label: "Good day", emoji: "🌤️", color: "#10B981", bg: "#D1FAE5", desc: "Full routine" },
  { value: 5, label: "Great!", emoji: "☀️", color: "#059669", bg: "#A7F3D0", desc: "Ready for extras" },
];

const MORNING_TASKS = [
  { id: "brush_teeth", label: "Brush teeth", essential: true },
  { id: "wash_face", label: "Wash face", essential: true },
  { id: "clean_glasses", label: "Clean glasses", essential: true },
  { id: "brush_hair", label: "Brush hair", essential: false },
  { id: "get_dressed", label: "Get dressed", essential: true },
  { id: "backpack_binder", label: "Backpack + binder", essential: true },
];

const CLASSES = [
  "Technical Theatre", "Health & Family Ed", "American History",
  "Spanish 1", "Biology", "English 1", "Advanced Geometry"
];

const CHORES = [
  { id: "dishes", label: "Dishes" },
  { id: "tidy_room", label: "Tidy room" },
  { id: "laundry_wash", label: "Laundry — wash & dry" },
  { id: "laundry_fold", label: "Laundry — fold & put away" },
  { id: "clean_for_cleaners", label: "Clean up for cleaners" },
];

const EVENING_TASKS = [
  { id: "medication", label: "Medication", essential: true },
  { id: "shower", label: "Shower", essential: false },
  { id: "retainer", label: "Retainer in", essential: true },
  { id: "brush_teeth_pm", label: "Brush teeth", essential: true },
  { id: "pick_clothes", label: "Pick out tomorrow's clothes", essential: false },
];

function EnergyPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
      {ENERGY_LEVELS.map((level) => {
        const isSelected = value === level.value;
        return (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            style={{
              flex: "1 1 0",
              minWidth: "56px",
              maxWidth: "80px",
              padding: "12px 4px 8px",
              border: isSelected ? `3px solid ${level.color}` : "2px solid #E5E7EB",
              borderRadius: "16px",
              background: isSelected ? level.bg : "white",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s ease",
              transform: isSelected ? "scale(1.08)" : "scale(1)",
              boxShadow: isSelected ? `0 4px 12px ${level.color}33` : "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <span style={{ fontSize: "28px" }}>{level.emoji}</span>
            <span style={{
              fontSize: "10px",
              fontWeight: "700",
              color: isSelected ? level.color : "#9CA3AF",
              textAlign: "center",
              lineHeight: "1.2",
              letterSpacing: "0.3px",
            }}>
              {level.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TaskCheckbox({ task, checked, onChange, dimmed }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        background: checked ? "#F0FDF4" : dimmed ? "#F9FAFB" : "white",
        border: checked ? "1.5px solid #86EFAC" : "1.5px solid #E5E7EB",
        cursor: "pointer",
        transition: "all 0.15s ease",
        opacity: dimmed ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: "20px", height: "20px", accentColor: "#10B981", cursor: "pointer" }}
      />
      <span style={{
        fontSize: "15px",
        fontWeight: checked ? "600" : "400",
        color: checked ? "#166534" : dimmed ? "#9CA3AF" : "#374151",
        textDecoration: checked ? "line-through" : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {task.label}
      </span>
      {task.essential && (
        <span style={{
          marginLeft: "auto",
          fontSize: "9px",
          fontWeight: "700",
          color: "#6366F1",
          background: "#EDE9FE",
          padding: "2px 8px",
          borderRadius: "99px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          essential
        </span>
      )}
    </label>
  );
}

function MultiSelect({ options, selected, onChange, dimmed }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {options.map((opt) => {
        const isSelected = selected.includes(typeof opt === "string" ? opt : opt.id);
        const label = typeof opt === "string" ? opt : opt.label;
        const id = typeof opt === "string" ? opt : opt.id;
        return (
          <button
            key={id}
            onClick={() => {
              if (isSelected) onChange(selected.filter((s) => s !== id));
              else onChange([...selected, id]);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "99px",
              border: isSelected ? "2px solid #6366F1" : "1.5px solid #E5E7EB",
              background: isSelected ? "#EDE9FE" : "white",
              color: isSelected ? "#4338CA" : dimmed ? "#9CA3AF" : "#374151",
              fontSize: "13px",
              fontWeight: isSelected ? "600" : "400",
              cursor: "pointer",
              transition: "all 0.15s ease",
              opacity: dimmed ? 0.5 : 1,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {isSelected ? "✓ " : ""}{label}
          </button>
        );
      })}
    </div>
  );
}

function SuccessScreen({ formType, completedCount, totalCount, energy, onReset }) {
  const energyData = ENERGY_LEVELS[energy - 1];
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  return (
    <div style={{
      textAlign: "center",
      padding: "48px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #A7F3D0, #6EE7B7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
      }}>
        ✓
      </div>
      <h2 style={{
        fontSize: "22px",
        fontWeight: "800",
        color: "#111827",
        margin: 0,
        fontFamily: "'Fraunces', serif",
      }}>
        Check-in complete!
      </h2>
      <p style={{
        fontSize: "15px",
        color: "#6B7280",
        margin: 0,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {energy <= 2
          ? "Even on tough days, you showed up. That matters."
          : percent === 100
          ? "Every single item done — you crushed it, Gabrielle!"
          : `${completedCount} of ${totalCount} tasks completed. Great effort!`}
      </p>
      <div style={{
        padding: "8px 16px",
        background: energyData.bg,
        borderRadius: "99px",
        fontSize: "13px",
        fontWeight: "600",
        color: energyData.color,
      }}>
        Energy today: {energyData.emoji} {energyData.label}
      </div>
      <button
        onClick={onReset}
        style={{
          marginTop: "16px",
          padding: "12px 32px",
          borderRadius: "99px",
          border: "none",
          background: "#6366F1",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Done
      </button>
    </div>
  );
}

export default function GabrielleCheckIn() {
  const [activeForm, setActiveForm] = useState(null);
  const [energy, setEnergy] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [homeworkClasses, setHomeworkClasses] = useState([]);
  const [choresCompleted, setChoresCompleted] = useState([]);
  const [otherChore, setOtherChore] = useState("");
  const [showOtherChore, setShowOtherChore] = useState(false);
  const [goodThing, setGoodThing] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setActiveForm(null);
    setEnergy(0);
    setCheckedTasks([]);
    setHomeworkClasses([]);
    setChoresCompleted([]);
    setOtherChore("");
    setShowOtherChore(false);
    setGoodThing("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    const data = {
      timestamp,
      formType: activeForm,
      energy,
      tasks: checkedTasks,
      ...(activeForm === "afternoon" && { homeworkClasses, chores: choresCompleted, otherChore: otherChore || undefined }),
      ...(activeForm === "evening" && { goodThing }),
    };
    console.log("Form submission:", JSON.stringify(data, null, 2));
    setSubmitted(true);
  };

  const isLowEnergy = energy > 0 && energy <= 2;
  const currentTasks = activeForm === "morning" ? MORNING_TASKS
    : activeForm === "evening" ? EVENING_TASKS : [];

  const visibleTasks = isLowEnergy
    ? currentTasks.filter((t) => t.essential)
    : currentTasks;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (!activeForm) {
    return (
      <div style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "32px 20px",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F5F3FF 0%, #FAFAFE 40%, #FFFFFF 100%)",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#1F1235",
            margin: "0 0 4px",
            fontFamily: "'Fraunces', serif",
          }}>
            {greeting}, Gabrielle
          </h1>
          <p style={{ fontSize: "14px", color: "#8B7FA8", margin: 0 }}>
            Which check-in are you doing?
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { id: "morning", emoji: "🌅", label: "Morning", desc: "Hygiene & getting ready", color: "#F59E0B", bg: "linear-gradient(135deg, #FEF3C7, #FDE68A)" },
            { id: "afternoon", emoji: "📚", label: "Afternoon", desc: "Homework & chores", color: "#6366F1", bg: "linear-gradient(135deg, #EDE9FE, #C4B5FD)" },
            { id: "evening", emoji: "🌙", label: "Evening", desc: "Wind down & prep", color: "#8B5CF6", bg: "linear-gradient(135deg, #F3E8FF, #DDD6FE)" },
          ].map((form) => (
            <button
              key={form.id}
              onClick={() => setActiveForm(form.id)}
              style={{
                padding: "20px",
                border: "none",
                borderRadius: "20px",
                background: form.bg,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textAlign: "left",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <span style={{
                fontSize: "36px",
                width: "56px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.7)",
                flexShrink: 0,
              }}>
                {form.emoji}
              </span>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#1F1235", fontFamily: "'Fraunces', serif" }}>
                  {form.label}
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
                  {form.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: "32px",
          textAlign: "center",
          fontSize: "11px",
          color: "#C4B5FD",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}>
          GABRIELLE'S SUPPORT SYSTEM — POWERED BY THE WILKS FAMILY 💜
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "32px 20px",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 50%)",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap" rel="stylesheet" />
        <SuccessScreen
          formType={activeForm}
          completedCount={checkedTasks.length + homeworkClasses.length + choresCompleted.length + (otherChore ? 1 : 0)}
          totalCount={visibleTasks.length + (activeForm === "afternoon" ? CLASSES.length + CHORES.length : 0)}
          energy={energy}
          onReset={resetForm}
        />
      </div>
    );
  }

  const formTitle = activeForm === "morning" ? "Morning Check-In" : activeForm === "afternoon" ? "Afternoon Check-In" : "Evening Check-In";

  return (
    <div style={{
      maxWidth: "420px",
      margin: "0 auto",
      padding: "24px 20px 100px",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 30%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap" rel="stylesheet" />

      <button onClick={resetForm} style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: "14px", color: "#6366F1", fontWeight: "600",
        marginBottom: "16px", padding: "4px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        ← Back
      </button>

      <h1 style={{
        fontSize: "24px",
        fontWeight: "800",
        color: "#1F1235",
        margin: "0 0 24px",
        fontFamily: "'Fraunces', serif",
      }}>
        {formTitle}
      </h1>

      {/* Energy Check */}
      <div style={{ marginBottom: "28px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "700",
          color: "#374151",
          marginBottom: "12px",
        }}>
          How's your energy right now?
        </label>
        <EnergyPicker value={energy} onChange={setEnergy} />
        {energy > 0 && (
          <div style={{
            marginTop: "10px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "600",
            color: ENERGY_LEVELS[energy - 1].color,
            background: ENERGY_LEVELS[energy - 1].bg,
            padding: "6px 12px",
            borderRadius: "99px",
            display: "inline-block",
            width: "100%",
          }}>
            {ENERGY_LEVELS[energy - 1].desc}
            {isLowEnergy && " — only essentials shown 💜"}
          </div>
        )}
      </div>

      {energy > 0 && (
        <>
          {/* Task Checkboxes */}
          {(activeForm === "morning" || activeForm === "evening") && (
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "12px",
              }}>
                {activeForm === "morning" ? "What did you get done?" : "Evening tasks"}
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {visibleTasks.map((task) => (
                  <TaskCheckbox
                    key={task.id}
                    task={task}
                    checked={checkedTasks.includes(task.id)}
                    onChange={() => {
                      if (checkedTasks.includes(task.id))
                        setCheckedTasks(checkedTasks.filter((t) => t !== task.id));
                      else setCheckedTasks([...checkedTasks, task.id]);
                    }}
                    dimmed={false}
                  />
                ))}
              </div>
              {isLowEnergy && currentTasks.length > visibleTasks.length && (
                <p style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginTop: "8px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}>
                  {currentTasks.length - visibleTasks.length} non-essential items hidden for today
                </p>
              )}
            </div>
          )}

          {/* Afternoon: Homework */}
          {activeForm === "afternoon" && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#374151",
                  marginBottom: "12px",
                }}>
                  Which classes did you work on?
                </label>
                <MultiSelect
                  options={CLASSES}
                  selected={homeworkClasses}
                  onChange={setHomeworkClasses}
                  dimmed={false}
                />
              </div>

              {!isLowEnergy && (
                <div style={{ marginBottom: "24px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "12px",
                  }}>
                    Chores completed
                  </label>
                  <MultiSelect
                    options={CHORES}
                    selected={choresCompleted}
                    onChange={setChoresCompleted}
                    dimmed={false}
                  />
                  <div style={{ marginTop: "8px" }}>
                    {!showOtherChore ? (
                      <button
                        onClick={() => setShowOtherChore(true)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "99px",
                          border: "1.5px dashed #D1D5DB",
                          background: "white",
                          color: "#6B7280",
                          fontSize: "13px",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        + Other
                      </button>
                    ) : (
                      <div style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}>
                        <input
                          type="text"
                          value={otherChore}
                          onChange={(e) => setOtherChore(e.target.value)}
                          placeholder="What else did you do?"
                          autoFocus
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "12px",
                            border: "1.5px solid #6366F1",
                            fontSize: "14px",
                            fontFamily: "'DM Sans', sans-serif",
                            outline: "none",
                          }}
                        />
                        <button
                          onClick={() => { setShowOtherChore(false); setOtherChore(""); }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#9CA3AF",
                            padding: "4px",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isLowEnergy && (
                <p style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginTop: "8px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}>
                  Chores hidden for today — focus on what you can 💜
                </p>
              )}
            </>
          )}

          {/* Evening: Good thing */}
          {activeForm === "evening" && (
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "8px",
              }}>
                One good thing that happened today
              </label>
              <textarea
                value={goodThing}
                onChange={(e) => setGoodThing(e.target.value)}
                placeholder="Even something small counts..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1.5px solid #E5E7EB",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  resize: "none",
                  height: "80px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "#6366F1"}
                onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>
          )}

          {/* Submit */}
          <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 20px",
            background: "linear-gradient(180deg, transparent, white 30%)",
            display: "flex",
            justifyContent: "center",
          }}>
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                maxWidth: "380px",
                padding: "16px",
                borderRadius: "16px",
                border: "none",
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.35)",
                transition: "transform 0.15s ease",
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Submit Check-In ✓
            </button>
          </div>
        </>
      )}
    </div>
  );
}