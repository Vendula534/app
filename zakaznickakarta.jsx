import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";

export default function ZakaznickaKarta() {
  const [karty, setKarty] = useState(() => {
    const ulozene = localStorage.getItem("zakaznice");
    return ulozene ? JSON.parse(ulozene) : [];
  });

  const [novaKarta, setNovaKarta] = useState({
    jmeno: "",
    datum: "",
    typNehtu: "",
    material: "",
    frekvence: "",
    poznamka: "",
  });

  const [filtr, setFiltr] = useState("");

  const ulozitKartu = () => {
    if (!novaKarta.jmeno || !novaKarta.datum) return;
    const noveKarty = [...karty, novaKarta];
    setKarty(noveKarty);
    localStorage.setItem("zakaznice", JSON.stringify(noveKarty));
    setNovaKarta({ jmeno: "", datum: "", typNehtu: "", material: "", frekvence: "", poznamka: "" });
  };

  const smazatKartu = (indexToRemove: number) => {
    const aktualizovaneKarty = karty.filter((_, index) => index !== indexToRemove);
    setKarty(aktualizovaneKarty);
    localStorage.setItem("zakaznice", JSON.stringify(aktualizovaneKarty));
  };

  const filtrovaneKarty = karty.filter((k) =>
    k.jmeno.toLowerCase().includes(filtr.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto" style={{ backgroundColor: "#fadfee" }}>
      <h1 className="text-2xl font-bold mb-4">Zákaznická karta</h1>

      <Input
        placeholder="Hledat podle jména"
        className="mb-4"
        value={filtr}
        onChange={(e) => setFiltr(e.target.value)}
      />

      <Card className="mb-6">
        <CardContent className="grid gap-4 p-4">
          <Input
            placeholder="Jméno zákaznice"
            value={novaKarta.jmeno}
            onChange={(e) => setNovaKarta({ ...novaKarta, jmeno: e.target.value })}
          />
          <Input
            type="date"
            value={novaKarta.datum}
            onChange={(e) => setNovaKarta({ ...novaKarta, datum: e.target.value })}
          />
          <Select onValueChange={(value) => setNovaKarta({ ...novaKarta, typNehtu: value })}>
            <SelectTrigger>{novaKarta.typNehtu || "Vyber typ nehtů"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Měkké">Měkké</SelectItem>
              <SelectItem value="Tvrdé">Tvrdé</SelectItem>
              <SelectItem value="Normální">Normální</SelectItem>
              <SelectItem value="Zatěžované">Zatěžované</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setNovaKarta({ ...novaKarta, material: value })}>
            <SelectTrigger>{novaKarta.material || "Vyber materiál"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Unica + Bottle Gel">Unica + Bottle Gel</SelectItem>
              <SelectItem value="Pro Base + Bottle Gel">Pro Base + Bottle Gel</SelectItem>
              <SelectItem value="Unica + Modelační Gel">Unica + Modelační Gel</SelectItem>
              <SelectItem value="Pro Base + Modelační Gel">Pro Base + Modelační Gel</SelectItem>
              <SelectItem value="Haft Bond + Unique Builder">Haft Bond + Unique Builder</SelectItem>
              <SelectItem value="Haft Bond + Primer kyselinový">Haft Bond + Primer kyselinový</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setNovaKarta({ ...novaKarta, frekvence: value })}>
            <SelectTrigger>{novaKarta.frekvence || "Frekvence návštěv"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="3 týdny">3 týdny</SelectItem>
              <SelectItem value="4 týdny">4 týdny</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Poznámka k návštěvě (např. reakce, výdrž, návrhy na příště)"
            value={novaKarta.poznamka}
            onChange={(e) => setNovaKarta({ ...novaKarta, poznamka: e.target.value })}
          />
          <Button onClick={ulozitKartu}>Uložit kartu</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filtrovaneKarty.map((karta, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-2">
              <p><strong>Jméno:</strong> {karta.jmeno}</p>
              <p><strong>Datum:</strong> {karta.datum}</p>
              <p><strong>Typ nehtů:</strong> {karta.typNehtu}</p>
              <p><strong>Použitý materiál:</strong> {karta.material}</p>
              <p><strong>Frekvence návštěv:</strong> {karta.frekvence}</p>
              <p><strong>Poznámka:</strong> {karta.poznamka}</p>
              <Button variant="destructive" onClick={() => smazatKartu(index)}>
                Smazat
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
