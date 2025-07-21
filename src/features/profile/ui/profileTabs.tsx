import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import ProfileInventory from "./profileInventory";
import { Game } from "../types/types";

const ProfileTabs = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="dota2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dota2">Dota 2</TabsTrigger>
          <TabsTrigger value="cs2">CS 2</TabsTrigger>
        </TabsList>
        <TabsContent value="dota2">
          <ProfileInventory appId={Game.DOTA2} />
        </TabsContent>
        <TabsContent value="cs2">
          <ProfileInventory appId={Game.CS2} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
