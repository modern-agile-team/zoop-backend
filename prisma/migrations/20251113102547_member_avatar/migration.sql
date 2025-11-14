UPDATE game_room
SET members = (
  SELECT array_agg(
    CASE
      WHEN member ? 'avatarFileName' THEN member
      ELSE member || jsonb_build_object('avatarFileName', 'pendingImage')
    END
  )
  FROM unnest(members) AS member
)
WHERE members IS NOT NULL;