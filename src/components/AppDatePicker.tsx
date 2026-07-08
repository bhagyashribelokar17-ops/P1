import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

type ViewMode = "days" | "months" | "years";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MIN_YEAR = 1900;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function parseDateString(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  };
}

export default function AppDatePicker({
  label,
  placeholder,
  value,
  onChangeText,
  error,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<ViewMode>("days");

  const parsed = parseDateString(value);
  const today = new Date();

  const [viewYear, setViewYear] = useState(
    parsed?.year ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    parsed?.month ?? today.getMonth()
  );

  const open = () => {
    const current = parseDateString(value);
    setViewYear(current?.year ?? today.getFullYear());
    setViewMonth(current?.month ?? today.getMonth());
    setMode("days");
    setVisible(true);
  };

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectDay = (day: number) => {
    onChangeText(toDateString(viewYear, viewMonth, day));
    setVisible(false);
  };

  const selectMonth = (month: number) => {
    setViewMonth(month);
    setMode("days");
  };

  const selectYear = (year: number) => {
    setViewYear(year);
    setMode("months");
  };

  const isFutureMonth =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() &&
      viewMonth >= today.getMonth());

  const years = Array.from(
    { length: today.getFullYear() - MIN_YEAR + 1 },
    (_, i) => today.getFullYear() - i
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={[
          styles.input,
          error ? styles.errorBorder : null,
        ]}
        onPress={open}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={20}
          color="#6B7280"
        />
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.calendar} onPress={() => {}}>
            <View style={styles.calendarHeader}>
              {mode === "days" ? (
                <Pressable onPress={goToPrevMonth} hitSlop={8}>
                  <Ionicons name="chevron-back" size={22} color="#111827" />
                </Pressable>
              ) : (
                <View style={styles.headerSpacer} />
              )}

              <Pressable
                onPress={() =>
                  setMode(mode === "years" ? "days" : "years")
                }
                hitSlop={8}
              >
                <Text style={styles.calendarHeaderText}>
                  {mode === "days"
                    ? `${MONTHS[viewMonth]} ${viewYear}`
                    : mode === "months"
                    ? viewYear
                    : "Select Year"}
                </Text>
              </Pressable>

              {mode === "days" ? (
                <Pressable
                  onPress={goToNextMonth}
                  hitSlop={8}
                  disabled={isFutureMonth}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={isFutureMonth ? "#D1D5DB" : "#111827"}
                  />
                </Pressable>
              ) : (
                <View style={styles.headerSpacer} />
              )}
            </View>

            {mode === "days" && (
              <>
                <View style={styles.weekRow}>
                  {WEEKDAYS.map((day) => (
                    <Text key={day} style={styles.weekday}>
                      {day}
                    </Text>
                  ))}
                </View>

                <View style={styles.grid}>
                  {cells.map((day, index) => {
                    const isFuture =
                      !!day &&
                      new Date(viewYear, viewMonth, day) > today;

                    const isSelected =
                      !!day &&
                      parsed?.year === viewYear &&
                      parsed?.month === viewMonth &&
                      parsed?.day === day;

                    return (
                      <Pressable
                        key={index}
                        style={[
                          styles.dayCell,
                          isSelected ? styles.dayCellSelected : null,
                        ]}
                        disabled={!day || isFuture}
                        onPress={() => day && selectDay(day)}
                      >
                        {day ? (
                          <Text
                            style={[
                              styles.dayText,
                              isFuture ? styles.dayTextDisabled : null,
                              isSelected ? styles.dayTextSelected : null,
                            ]}
                          >
                            {day}
                          </Text>
                        ) : null}
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}

            {mode === "months" && (
              <View style={styles.grid}>
                {MONTHS_SHORT.map((label, month) => {
                  const isFuture =
                    viewYear === today.getFullYear() &&
                    month > today.getMonth();

                  const isSelected = month === viewMonth;

                  return (
                    <Pressable
                      key={label}
                      style={[
                        styles.gridCell,
                        isSelected ? styles.dayCellSelected : null,
                      ]}
                      disabled={isFuture}
                      onPress={() => selectMonth(month)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isFuture ? styles.dayTextDisabled : null,
                          isSelected ? styles.dayTextSelected : null,
                        ]}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {mode === "years" && (
              <ScrollView style={styles.yearScroll}>
                <View style={styles.grid}>
                  {years.map((year) => {
                    const isSelected = year === viewYear;

                    return (
                      <Pressable
                        key={year}
                        style={[
                          styles.gridCell,
                          isSelected ? styles.dayCellSelected : null,
                        ]}
                        onPress={() => selectYear(year)}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isSelected ? styles.dayTextSelected : null,
                          ]}
                        >
                          {year}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    fontSize: 16,
    color: "#111827",
  },

  placeholder: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  error: {
    marginTop: 5,
    color: "#EF4444",
    fontSize: 12,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  calendar: {
    width: "100%",
    maxWidth: 340,
    maxHeight: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headerSpacer: {
    width: 22,
  },

  calendarHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  weekRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  weekday: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },

  gridCell: {
    width: `${100 / 4}%`,
    aspectRatio: 1.6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  dayCellSelected: {
    backgroundColor: "#2563EB",
  },

  dayText: {
    fontSize: 14,
    color: "#111827",
  },

  dayTextDisabled: {
    color: "#D1D5DB",
  },

  dayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  yearScroll: {
    maxHeight: 320,
  },
});
