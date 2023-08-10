import * as SecureStore from 'expo-secure-store';

export async function loadString(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (err) {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch {
    return false;
  }
}

export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = await SecureStore.getItemAsync(key);
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
    await SecureStore.setItemAsync(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function remove(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
