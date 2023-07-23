import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    if (almostThere) {
      return JSON.parse(almostThere);
    }
    return null;
  } catch {
    return null;
  }
}

export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clear(): Promise<void> {
  await AsyncStorage.clear();
}
